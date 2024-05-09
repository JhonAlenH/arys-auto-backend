
const formatCreateData = (data) => {
  var keys = Object.keys(data)
  var valuesAndTypes = Object.values(data)
  var values = []
  var i = 0


  for (const value of valuesAndTypes) {
    const valueSplited = value.split('[]')
    const type = valueSplited[1].split('=')[1]
    if(type == 'extern' || type == 'noDB') {
      keys.splice(i, 1)
      i--
    } else if(valueSplited[0] == '') {
      values.push('null')
    }else if(type == 'text'){
      values.push(`'${valueSplited[0]}'`)
    } else if(type == 'number' || type == 'boolean') {
      values.push(valueSplited[0])
    }
    i++
  }
  
  keys = keys.join(',')
  values = values.join(',')
  const dataBody = {keys: keys, values: values}
  return dataBody;
}
const formatEditData = (data) => {
  var keys = Object.keys(data)
  var valuesAndTypes = Object.values(data)
  var values = []
  let dataBody = []
  var i = 0


  for (const value of valuesAndTypes) {
    const valueSplited = value.split('[]')
    const type = valueSplited[1].split('=')[1]
    if(type == 'extern' || type == 'noDB') {
      keys.splice(i, 1)
      i--
    } else if(valueSplited[0] == '') {
      dataBody.push(`${keys[i]}="null"`)
    }else if(type == 'text'){
      dataBody.push(`${keys[i]}='${valueSplited[0]}'`)
    } else if(type == 'number' || type == 'boolean') {
      dataBody.push(`${keys[i]}=${valueSplited[0]}`)
    }
    i++
  }
  
  dataBody = dataBody.join(',')
  return dataBody;
}

export default {
  formatCreateData,
  formatEditData
}