import { ITranslation } from 'src/commons/interfaces';
import { enCommonButtons, enCommonLabels } from 'src/translation/resources/commons/en-commons';

const english: ITranslation = {
    translation: {

    },
    commons: {
        ...enCommonButtons,
        ...enCommonLabels,
    },
};

export default english;
