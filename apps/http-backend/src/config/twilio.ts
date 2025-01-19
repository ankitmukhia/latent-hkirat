import twilio from "twilio"

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = twilio(accountSid, authToken)

export async function sendMessage(body: string, to: string) {
  const message = await client.messages.create({
    body,
    from: "+15075563951",
    to
  });
  return message
}
