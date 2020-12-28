class StringFormat {

}

const format = "yyyMMdd";


StringFormat.dateFormat = (date,format) => {
  if(isNaN(date) && isNaN(Date.parse(date))){
    console.log("data是日期格式！")
  }
}
