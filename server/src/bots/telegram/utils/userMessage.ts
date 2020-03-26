const FIRST_MESSAGE_EXPLANAITON: string = 'I can show you available data about COVID-19 🦠🤒 in all countries where it\'s registered.';

export const getUserName = ({first_name, last_name, username}): string => {
    return first_name ?? last_name ?? username ?? 'friend';
};

export const greetUser = (from): string => {
    return `Hi, ${getUserName(from)}. ${FIRST_MESSAGE_EXPLANAITON}`;
};

export const encouragingMessage = (): string => `Wash 🧼 your hands 👏 and stay healthy! Everything will be OK`;

export const suggestedBehaviors = (): string => `
🚫🤦 Don't touch your face
🚫🤧🤲 Don't sneeze into hands
✅🤧💪 Do sneeze into your elbow
🧼🖐⏲2️⃣0️⃣  Wash your hands regularly, for at least 20 seconds
✅📦😌 If practical, have groceries and other items delivered to your home
🚫🛒😡 When using local shops, don't buy literally everything on the shelves. Leave enough for others 💕
`;

export const socialDistancing = (): string => `
🚫🤝 No handshakes
🚫🧑‍🤝‍🧑 No close contact
🚫🏟 No large gatherings
`;

export const alternativeGreetings = (): string => `
👋 Waving Hand – Hello
🖖 Vulcan Salute – Live long and prosper
✌️ Victory Hand – Peace
🤟 Love-You Gesture – I love you in American Sign Language
🤘 Sign of the Horns – Rock on
💪 Flexed Biceps – Elbow-touch
🙏 Folded Hands – Namaste
✋💨🤚 – Air High Five
`;
