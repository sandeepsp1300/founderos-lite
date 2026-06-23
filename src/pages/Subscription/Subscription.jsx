import "./Subscription.css";

import {
  createSubscription
} from "../../services/subscriptionService";

import {
  createPayment
} from "../../services/paymentService";

import {
  getCurrentUser
} from "../../services/authService";

function Subscription() {

    const plans = [
        {
            id: 1,
            name: "Free Trial",
            price: 0,
            duration: "1 Day",
            features: [
                "Dashboard Access",
                "Task Management",
                "Meetings",
                "Documents",
                "Basic Analytics"
            ]
        },


        {
            id: 2,
            name: "Starter",
            price: 499,
            duration: "30 Days",
            popular: true,
            buttonText: "Upgrade to Starter",
            features: [
                "Everything in Free Trial",
                "Unlimited Tasks",
                "Unlimited Meetings",
                "Investor CRM",
                "Document Storage",
                "Analytics Dashboard",
                "Team Collaboration",
                "Email Integration",
                "Priority Support"
            ]
        },

        {
            id: 3,
            name: "Enterprise",
            price: 4999,
            duration: "365 Days",
            buttonText: "Upgrade to Enterprise",
            features: [
                "Everything in Starter",
                "Unlimited Team Members",
                "Advanced Analytics",
                "Custom Reports",
                "Role Permissions",
                "Dedicated Account Manager",
                "White Label Support",
                "24/7 Priority Support"
            ]
        }


    ];

    const handlePlanSelect = async (plan) => {


try {

    const { user } =
        await getCurrentUser();

    if (!user) {

        alert(
            "Please login first"
        );

        return;
    }

    // FREE TRIAL

    if (plan.name === "Free Trial") {

        const startDate =
            new Date();

        const endDate =
            new Date();

        endDate.setDate(
            endDate.getDate() + 1
        );

        await createSubscription(

            user.id,

            plan.id,

            plan.name,

            startDate.toISOString(),

            endDate.toISOString()

        );

        alert(
            "Free Trial Activated Successfully"
        );

        return;
    }

    // RAZORPAY CHECK

    if (!window.Razorpay) {

        alert(
            "Razorpay SDK not loaded"
        );

        return;
    }

    const options = {

        key:
            import.meta.env
                .VITE_RAZORPAY_KEY_ID,

        amount:
            plan.price * 100,

        currency: "INR",

        name: "FounderOS",

        description:
            `${plan.name} Subscription`,

        image: "/favicon.svg",

        theme: {

            color: "#4f46e5"

        },

        handler: async (
            response
        ) => {

            try {

                await createPayment({

                    userId:
                        user.id,

                    planId:
                        plan.id,

                    amount:
                        plan.price,

                    paymentId:
                        response.razorpay_payment_id,

                    status:
                        "success"

                });

                const startDate =
                    new Date();

                const endDate =
                    new Date();

                endDate.setDate(

                    endDate.getDate() +

                    (
                        plan.name ===
                        "Starter"

                            ? 30

                            : 365
                    )

                );

                await createSubscription(

                    user.id,

                    plan.id,

                    plan.name,

                    startDate.toISOString(),

                    endDate.toISOString()

                );

                alert(
                    `${plan.name} Activated Successfully`
                );

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Subscription activation failed"
                );

            }

        }

    };

    const razorpay =
        new window.Razorpay(
            options
        );

    razorpay.open();

} catch (error) {

    console.error(
        error
    );

}


};


    return (


        <div className="subscription-page">

            <div className="subscription-header">

                <h1>
                    Upgrade Your Plan
                </h1>

                <p>
                    Manage your FounderOS
                    subscription and billing
                </p>

            </div>

            <div className="current-plan">

                <span>
                    Current Plan
                </span>

                <h2>
                    Free Trial
                </h2>

                <p>
                    Expires in 1 Day
                </p>

            </div>

            <div className="plans-grid">

                {plans.map((plan) => (

                    <div
                        key={plan.id}
                        className={`plan-card ${plan.popular
                            ? "popular-plan"
                            : ""
                            }`}
                    >

                        {plan.popular && (

                            <div className="popular-badge">

                                MOST POPULAR

                            </div>

                        )}

                        <h2>
                            {plan.name}
                        </h2>

                        <div className="price">

                            ₹{plan.price}

                        </div>

                        <div className="duration">

                            {plan.duration}

                        </div>

                        <button
                            className="plan-btn"
                            onClick={() =>
                                handlePlanSelect(
                                    plan
                                )
                            }
                        >

                            {plan.buttonText}

                        </button>

                        <div className="feature-list">

                            {plan.features.map(
                                (feature, index) => (

                                    <div
                                        key={index}
                                        className="feature"
                                    >

                                        ✓ {feature}

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>


    );

}

export default Subscription;
