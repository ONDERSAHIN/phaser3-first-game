/**
 *
 * print.utils
 * @author : ONDER SAHIN
 * @year : 2020
 * @project : noonie-backoffice-ui
 *
 */
class PrintUtil {
    static asciiTag = ``;

    static styles = [
        'background: linear-gradient(#D33106, #571402)'
        , 'border: 1px solid #3E0E02'
        , 'color: white'
        , 'display: block'
        , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
        , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
        , 'line-height: 40px'
        , 'text-align: center'
        , 'font-weight: bold'
    ].join(';');

    static logAppTagToConsole(){
        console.log(`%c${PrintUtil.asciiTag}`,"background-color: #FFFFFF; color: purple");
        console.log("Powered by %c🌍 %chttp://ayvos.com/", "background-color: #FFFFFF; color: #000", "background-color: #FFFFFF; color: #008ce2");
    }
}

export default PrintUtil;