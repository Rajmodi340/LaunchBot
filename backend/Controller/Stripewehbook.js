import stripe from "../config/stripe.js";
import User from "../models/usermodel.js";

export const stripeWebhook = async (req, res) => {
  console.log("Webhook received");
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Event type:", event.type);
  } catch (error) {
    console.log("Webhook signature verification failed:", error.message);
    return res.status(400).json({ message: "Webhook Error" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);
    const plan = session.metadata.plan;

    console.log("Webhook received for user:", userId, "credits:", credits, "plan:", plan);

    await User.findByIdAndUpdate(userId, {
      $inc: { credits: credits },
      plan: plan,
    });

    console.log("Credits updated for user:", userId);
  }

  return res.json({ received: true });
};