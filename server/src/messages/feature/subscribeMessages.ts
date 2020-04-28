import {
    Subscription,
    UserSubscription,
} from '../../models/subscription.models';
import { getCountryMessage } from './countryMessages';
import { CountrySituationInfo } from '../../models/covid19.models';
import { getDiffMessage } from '../covid19Messages';
import { getLocalized } from '../../services/domain/localization.service';

export const ALREADY_SUBSCRIBED_MESSAGE: string =
    'You are already subscribed on the country';

export const subscriptionManagerResponseMessage = (locale: string): string =>
    getLocalized(locale, `Easy way to manage your subscriptions 💌`);

export const noSubscriptionsResponseMessage = (locale: string): string =>
    getLocalized(locale, `It seems you haven't subscribed for any 🥺`);

export const subscribeError = (message: string): string => {
    return `${message}, sorry 🙇🏽‍`;
};

export const subscriptionResultMessage = (message: string): string => {
    return `Cool, subscribed on ${message} 😎`;
};

export const showMySubscriptionMessage = (
    locale: string,
    userSubscription: UserSubscription
): string => {
    return getLocalized(locale, `You're 🔔 subscribed on: `).concat(
        userSubscription.subscriptionsOn
            .map((sub: Subscription) => `${sub.value}`)
            .join(', ')
    );
};

export const getCountrySubscriptionMessage = (
    { name, confirmed, recovered, deaths, date }: Partial<CountrySituationInfo>,
    {
        confirmed: prevConfirmed,
        recovered: prevRecovered,
        deaths: prevDeaths,
        date: prevDate,
    }: Partial<CountrySituationInfo>,
    locale: string
): string => {
    return (
        `🔔 ` +
        getCountryMessage(name, confirmed, recovered, deaths, date) +
        `\n\n📈 ${getLocalized(
            locale,
            'Country change, since'
        )} ⏱️${prevDate}\n` +
        getDiffMessage(
            { confirmed, recovered, deaths },
            {
                confirmed: prevConfirmed,
                recovered: prevRecovered,
                deaths: prevDeaths,
            }
        )
    );
};
