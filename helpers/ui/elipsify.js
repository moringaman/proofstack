export default function elispify(string, length) {
    if(string.length > length){
        return string.substring(0, length/2) + '...'
    }
    return string
}