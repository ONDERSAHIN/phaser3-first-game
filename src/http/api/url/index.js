import URL from './generators/rest_url'
import endpoints from './resources/endpoints';
import services from './resources/services';

/**
 *
 * @type {RestUrl}
 */
export const DEMO = new URL(services.no_service, endpoints.demo)
export const GAMES = new URL(services.no_service, endpoints.games)
export const GAME_QUIZ_QUESTIONS = new URL(services.no_service,endpoints.gameQuizQuestions)
export const GAME_SESSIONS = new URL(services.no_service,endpoints.gameSessions)
export const GAME_VISUAL_CONTENTS = new URL(services.no_service,endpoints.gameVisualContents)
export const GAME_QUIZ_QUESTION_CONTENT = new URL(services.no_service,endpoints.gameQuizQuestionContents)
export const PLAYERS = new URL(services.no_service,endpoints.players);
