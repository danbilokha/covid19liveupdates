import { Country } from '../../models/country.models';
import { getCountriesByContinent } from '../../services/domain/countries';

export const getShowCountriesMessage = (countries: Array<Country>): string => {
    const availableFor: string = `Available for ${countries.length} countries around the 🌍`;
    const countriesList: string = Object.entries(
        getCountriesByContinent(countries)
    )
        .map(([continentName, countries]: [string, Array<Country>]): string =>
            `\n🗺️ ${continentName}, totally ${countries.length} countries\n`.concat(
                countries.map((country: Country) => country.name).join('; ')
            )
        )
        .join('\n');
    const hint: string = `ℹ i.e. /country ${countries[0].name}`;

    return availableFor.concat(`\n\n${countriesList}`).concat(`\n\n${hint}`);
};
