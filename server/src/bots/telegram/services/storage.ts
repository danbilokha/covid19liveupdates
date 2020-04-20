import { TELEGRAM_PREFIX } from '../models';
import {
    getActiveSubscriptions,
    getActiveUserSubscription,
    getMessengerStorage,
    getSubscriptions,
    getUserSubscription,
    listenSubscriptionsChanges,
    setQueryToAnalyse,
    setSubscription,
    getAllUsers,
    getUser,
    addUser,
    getNotificationMessage,
} from '../../../services/domain/storage';
import * as firebase from 'firebase';

export const getTelegramFullStorage: Function = getMessengerStorage(
    TELEGRAM_PREFIX
);
export const getTelegramSubscriptions: Function = getSubscriptions(
    TELEGRAM_PREFIX
);
export const getTelegramActiveSubscriptions: Function = getActiveSubscriptions(
    TELEGRAM_PREFIX
);
export const getTelegramUserSubscriptions: Function = getUserSubscription(
    TELEGRAM_PREFIX
);
export const getTelegramActiveUserSubscriptions: Function = getActiveUserSubscription(
    TELEGRAM_PREFIX
);
export const getTelegramUser = getUser(TELEGRAM_PREFIX);
export const getTelegramAllUsers = getAllUsers(TELEGRAM_PREFIX);
export const addTelegramUser = addUser(TELEGRAM_PREFIX);
export const getTelegramNotificationMessage = getNotificationMessage(
    TELEGRAM_PREFIX
);
export const setTelegramSubscription: Function = setSubscription(
    TELEGRAM_PREFIX
);
export const setTelegramQueryToAnalyse: Function = setQueryToAnalyse(
    TELEGRAM_PREFIX
);

export const listenTelegramUsersSubscriptionsChanges: Function = listenSubscriptionsChanges(
    TELEGRAM_PREFIX
);
export const telegramUsersSubscriptionsChangesHandler = (
    a: firebase.database.DataSnapshot,
    b?: string | null
): unknown => {
    // a.val() will give you an updates on every change of Firebase, reactively
    return '';
};
