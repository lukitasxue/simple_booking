import { simulateWebhookPost } from "../../utils";
import { ChatSession } from "@/lib/database/models/chat-session";
import { UserContext } from "@/lib/database/models/user-context";
import { Service } from "@/lib/database/models/service";
import { deleteChatSessionsForUser, deleteUserByWhatsapp } from "../../dbUtils";
import {
  TEST_CONFIG,
  getNormalizedTestPhone,
} from "../../../config/test-config";
import { BOT_CONFIG } from "@/lib/bot-engine/types";

export const TEST_PHONE = TEST_CONFIG.TEST_PHONE_NUMBER;
export const BUSINESS_ID = TEST_CONFIG.BUSINESS_ID;

export async function cleanup() {
  await deleteChatSessionsForUser(TEST_PHONE);
  await deleteUserByWhatsapp(TEST_PHONE);
  
  // Delete ALL UserContext records for this user and business (handling duplicates)
  try {
    const normalizedPhone = getNormalizedTestPhone();
    console.log(`[Cleanup] Cleaning UserContext for ${normalizedPhone} in business ${BUSINESS_ID}`);
    
    // Get and delete ALL UserContext records for this user/business combination
    // We need to use direct Supabase query since there's no deleteMany method
    const { getEnvironmentServiceRoleClient } = await import('@/lib/database/supabase/environment');
    const supa = getEnvironmentServiceRoleClient();
    
    const { data: contexts, error: fetchError } = await supa
      .from('userContexts')
      .select('id')
      .eq('channelUserId', normalizedPhone)
      .eq('businessId', BUSINESS_ID);
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.log(`[Cleanup] Error fetching UserContext records:`, fetchError);
    } else if (contexts && contexts.length > 0) {
      console.log(`[Cleanup] Found ${contexts.length} UserContext records to delete`);
      
      // Delete each record individually
      for (const ctx of contexts) {
        await UserContext.delete(ctx.id);
      }
      
      console.log(`[Cleanup] Successfully deleted ${contexts.length} UserContext records`);
    } else {
      console.log(`[Cleanup] No UserContext records found to delete`);
    }
  } catch (error) {
    console.log(`[Cleanup] UserContext cleanup error (may be expected):`, error);
  }
}

export async function startBookingFlow() {
  const resp = await simulateWebhookPost({
    phone: TEST_PHONE,
    message: "start_booking_flow",
  });
  expect(JSON.stringify(resp)).toMatch(/success/i);
}

export async function getActiveSession() {
  return await ChatSession.getActiveByChannelUserId(
    "whatsapp",
    getNormalizedTestPhone(),
    BOT_CONFIG.SESSION_TIMEOUT_HOURS,
  );
}

export async function fetchServices() {
  const services = await Service.getByBusiness(BUSINESS_ID);
  expect(services.length).toBeGreaterThan(0);
  return services;
}

export async function getGoalData() {
  const session = await getActiveSession();
  return session?.activeGoals[0]?.collectedData as any;
}

export async function getLastBotMessage() {
  const session = await getActiveSession();
  if (!session || session.allMessages.length === 0) return "";
  const last = session.allMessages[session.allMessages.length - 1];
  return typeof last.content === "string"
    ? last.content
    : (last.content as any)?.text || "";
}

export function verifyServiceSelected(goalData: any, service: any) {
  const arr = goalData.selectedServices || [];
  expect(arr.find((s: any) => s.id === service.id)).toBeDefined();
}

export function verifyNoServiceSelected(goalData: any) {
  const arr = goalData.selectedServices || [];
  expect(arr.length).toBe(0);
  expect(goalData.selectedService).toBeUndefined();
}

export async function verifyBookingFlowActive() {
  const session = await getActiveSession();
  expect(session?.activeGoals[0]?.goalType).toBe("serviceBooking");
}