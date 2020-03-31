import {Answer} from "../../models/knowledgebase/answer";
import {KnowledgebaseMeta} from "../../models/knowledgebase/meta";
import {getNumberEmoji} from "../emoji";
import {UserRegExps} from "../../models/constants";

export const getAssistantFeaturesMessage = (meta: KnowledgebaseMeta, categories: Array<string>): string => {
    const typicalQuestions: string = `\n\nTypically, people ask me🧐\n${meta.questions.map((v, idx) => `${getNumberEmoji(idx)} ${v}`).join('\n')}`;
    const toAsk = `\n\nIf you have a question, type ${UserRegExps.Assistant} [question]`;
    return `So. My knowledge base 📚 has ${categories.length} categories: ${categories.join(', ')}${typicalQuestions}${toAsk}`
};

export const getAnswerMessage = ({answer, links, additionalAnswers, additionalLinks}: Answer): string => {
    const ourAnswer = answer
        ? `\n🙋 ${answer}`
        : '\n🙋';
    const ourLinks: string = links?.length
        ? `\n🔗 Consider these links: \n${links.join(',\n')}`
        : '';
    const additionalAnswer: string = additionalAnswers?.length
        ? `.\n\n${additionalAnswers.join(',\n')}`
        : '';
    const additionalLink: string = additionalLinks?.length
        ? `.\n🔗🔗🔗More links:\n${additionalLinks.join(',\n')}`
        : '';
    return `${ourAnswer}${ourLinks}${additionalAnswer}${additionalLink}`
};
