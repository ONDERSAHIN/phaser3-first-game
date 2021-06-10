/**
 * IDENFIT SYSTEM STATUS CODES
 * @type {string}
 */
export const BAD_REQUEST = 700; // deprecated
export const MISSING_REQUEST_PARAMETER = 701; // required fields are not sended
export const UNSUPPORTED_MEDIA_TYPE = 702; // json invalid
export const INVALID_METHOD_ARGUMENT = 703; // validation limits exceed
export const CONSTRAINT_VIOLATION = 704;
export const HTTP_MESSAGE_NOT_READABLE = 705; // json malformed
export const HTTP_MESSAGE_NOT_WRITABLE = 706; // server side error
export const DATA_INTEGRITY_VIOLATION = 707; // Database level Error
export const METHOD_ARGUMENT_TYPE_MISMATCH = 708; // for example :String expected int given
export const INVALID_PROPERTY_REFERENCE = 709; // deprecated
export const INVALID_QUERY = 710; // deprecated
export const ENTITY_NOT_FOUND = 711;
export const PROPERTY_NOT_FOUND = 712;
export const FILE_SIZE_TOO_BIG = 713;
export const REQUESTED_MEDIA_NOT_FOUND = 714;
export const BAD_CREDENTIALS = 715;
export const INVALID_ENTITY_OPERATION = 716;
export const INVALID_EXCEL_FORMAT_ = 717;
export const PASSWORD_RESET_TOKEN_REQUEST_TIME_TOO_EARLY = 718;
export const PASSWORD_RESET_TOKEN_TIME_OUT = 719;
export const SUPREMA_SDK_ERROR = 720;
export const NO_REFRESH_TOKEN = 750;
