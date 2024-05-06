
const formatData = (data) => {
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
  console.log(dataBody);
  return dataBody;
}

export default {
  formatData
}