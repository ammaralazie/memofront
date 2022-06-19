import * as cookie from "vue-cookies";
var currentLang = cookie.get("lang");

//this function used only for change format date
function changeNumberFormat(date, msg) {
  // var arListNumber=['۰','۱','۲','۳','٤','۵','٦','۷','۸','۹']
  // var enListNumber=['1','2','3','4','5','6','7','8','9','0']
  var i = 0;
  var newFormatNumber = [];
  var time = null;
  if (currentLang == "ar") {
    for (i; i < date.length; i++) {
      if ("1" == date[i]) newFormatNumber.push("۱");
      else if ("2" == date[i]) newFormatNumber.push("۲");
      else if ("3" == date[i]) newFormatNumber.push("۳");
      else if ("4" == date[i]) newFormatNumber.push("٤");
      else if ("5" == date[i]) newFormatNumber.push("۵");
      else if ("6" == date[i]) newFormatNumber.push("٦");
      else if ("7" == date[i]) newFormatNumber.push("۷");
      else if ("8" == date[i]) newFormatNumber.push("۸");
      else if ("9" == date[i]) newFormatNumber.push("۹");
      else if ("0" == date[i]) newFormatNumber.push("۰");
      else {
        if ((date[i] == "A" || date[i] == "P") && date[i + 1] == "M") {
          time = date.split(" ");
          if (time[1] == "PM") {
            if (msg) newFormatNumber = [" م "].concat(newFormatNumber);
            else newFormatNumber = [" مساءا "].concat(newFormatNumber);
            break;
          } else if (time[1] == "AM") {
            if (msg) newFormatNumber = [" ص "].concat(newFormatNumber);
            else newFormatNumber = [" صباحا "].concat(newFormatNumber);
            break;
          } /* end of if */
        } else {
          newFormatNumber.push(date[i]);
        }
      }
    } /* end of for loop */

    var newDate = null;
    newFormatNumber.forEach((value) => {
      if (!newDate) newDate = value;
      else newDate += value;
    }); /* end of forEach */
    return newDate;
  } /* end of if */
} /* end of changeNumberFormat*/

//this funcion only for convert  normal number 1,2,3,4,5,6,...
function changeFomat(data) {

  if (currentLang == "ar") {
    var StringNumber = String(data);
    var newFormatNumber = [];
    for (var i = 0; i < StringNumber.length; i++) {
      if ("1" == StringNumber[i]) newFormatNumber.push("۱");
      else if ("2" == StringNumber[i]) newFormatNumber.push("۲");
      else if ("3" == StringNumber[i]) newFormatNumber.push("۳");
      else if ("4" == StringNumber[i]) newFormatNumber.push("٤");
      else if ("5" == StringNumber[i]) newFormatNumber.push("۵");
      else if ("6" == StringNumber[i]) newFormatNumber.push("٦");
      else if ("7" == StringNumber[i]) newFormatNumber.push("۷");
      else if ("8" == StringNumber[i]) newFormatNumber.push("۸");
      else if ("9" == StringNumber[i]) newFormatNumber.push("۹");
      else if ("0" == StringNumber[i]) newFormatNumber.push("۰");
    } /* end of for loop */
    return newFormatNumber.join()
  }else{
    return data
  }/* end of if */
} /* /changeFomatNumber */

export default {
  changeNumberFormat,
  changeFomat,
}; /* end of export default */
