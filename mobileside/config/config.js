import {Platform} from 'react-native';
let server = '';
{
  Platform.OS == 'android'
    ? (server =
        'http://192.168.93.13:5000/api/v1' || //office ptcl
        'http://192.168.91.22:5000/api/v1' || //office transworld
        'http://192.168.0.107:5000/api/v1') // ip  home ip
    : (server = 'http://192.168.96.30:5000/api/v1'); //office wateen ip
}
export default {server};
