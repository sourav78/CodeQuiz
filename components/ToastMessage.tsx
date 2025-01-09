import Toast from 'react-native-toast-message'

interface ToastTypes {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

const ToastMessage = ({ type, message }: ToastTypes) => {
  Toast.show({
    type: type,
    text1: type.charAt(0).toUpperCase() + type.slice(1), // capitalize first letter
    text2: message,
    text2Style: {fontSize:12},
    position: "top",  
  });
};

export default ToastMessage;