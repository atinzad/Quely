import styled from "styled-components/native";
import { Icon, Box, HStack } from "native-base";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";

export const theme = {
  Maincolor: "#9381ff",
  backgroundColor: "#f5fffa",
  black: "black",
  blackish: "#484848",
  grey: "#99aab5",
  blueish: "#9381ff",
  redish: "#f23d3a",
};
export const MemberlistWaitingServed = styled.Text`
  font-size: 25px;
  color: #1d7996;
  font-weight: bold;
`;
export const ModalEmailIconView = styled.View`
  width: 20%;
  justify-content: center;
  margin-left: 1%;
`;
export const ModalSwitchView = styled.View`
  width: 20%;
  justify-content: center;
`;
export const ModalRequiredView = styled.View`
  width: 30%;
  justify-content: center;
`;

export const ToastText = styled.Text`
  font-size: 18px;
  color: #f8f8f8;
  font-weight: bold;
`;
export const ModalRequiredText = styled.Text`
  font-size: 18px;
  color: #3f93a2;
  font-weight: bold;
`;
export const ModalTitleTopView = styled.View`
  height: 20%;
  align-items: center;
  justify-content: center;
`;
export const ModalInputsView = styled.View`
  height: 20%;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  color: #3f93a2;
  font-weight: bold;
`;
export const CardMargin = styled.View`
  margin-top: 7px;
`;
export const MemberCardNumber = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #c2dadf;
`;
export const MemberCardLeft = styled.View`
  width: 12%;
  justify-content: center;
`;
export const MemberCardMiddle = styled.View`
  width: 50%;
  justify-content: center;
`;
export const MemberCardNotificationBtn = styled.View`
  width: 23%;
  justify-content: center;
  align-items: center;
`;
export const MemberCardServedBtn = styled.Pressable`
  width: 15%;
  background-color: #3f93a2;
  justify-content: center;
  align-items: center;
`;

export const MemberItemContainer = styled.Pressable`
  height: 90px;
  background-color: white;
  padding-left: 20px;
  justify-content: center;
`;
export const MemberHstack = styled(HStack)`
  height: 100%;
  justify-content: center;
`;
export const AddQueueButtonPlus = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #f8f8f8;
`;
export const PageUpperLeft = styled.View`
  width: 80%;
  justify-content: center;
`;
export const PageUpperRight = styled.View`
  width: 20%;
  justify-content: center;
  align-items: center;
`;
export const AddQueueButtonView = styled.Pressable`
  height: 50px;
  width: 50px;
  background-color: #3f93a2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const QueueEdit = styled.Text`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  color: #3f93a2;
  font-weight: bold;
`;
export const QueueTitle = styled.Text`
  font-size: 25px;
  color: #3f93a2;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const QueueWaiting = styled.Text`
  font-size: 15px;
  color: #3f93a2;
`;
export const QueueItemContainer = styled.Pressable`
  height: 90px;
  background-color: white;
  padding-left: 50px;
  justify-content: center;
`;
export const QueueContainer = styled.View`
  height: 70px;
`;
export const InQueueTitle = styled.Text`
  font-size: 20px;
  color: #3f93a2;
  font-weight: bold;
`;
export const MyQueuesTitle = styled.Text`
  font-size: 40px;
  color: #3f93a2;
  font-weight: bold;
`;
export const QueueListTitle = styled(Box)`
  height: 15%;
  justify-content: center;

  background-color: #f8f8f8;
`;
export const QueueListQueues = styled(Box)`
  height: 85%;
  background-color: #f8f8f8;
`;
export const SignUpText = styled.Text`
  font-size: 40px;
  color: #3f93a2;
`;

export const SignUpTextContainer = styled.View`
  height: 30%;
  justify-content: center;
`;
export const SignUpInputContainer = styled.View`
  height: 40%;
`;
export const SignUpButtonContainer = styled.View`
  height: 30%;
`;
export const AuthContainer = styled.View`
  align-self: stretch;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const AuthTextInput = styled.TextInput`
  border-bottom-color: #3f93a2;
  color: #3f93a2;
  border-bottom-width: 1px;
  border-bottom-color: #3f93a2;
`;
export const MainLogo = styled.Text`
  font-size: 60px;
  top: 20%;
  color: #3f93a2;
`;

export const NoAccounttext = styled.Text`
  font-size: 15px;
  color: #3f93a2;
  opacity: 0.6;
`;
export const NoAccountSignupText = styled.Text`
  font-size: 15px;
  color: #3f93a2;
  font-weight: bold;
`;
//MySchedule
export const AgendaStyled = styled.View`
  flex: 1;
`;

export const RednerItemButton = styled.TouchableOpacity`
  margin-right: 10px;
  margin-top: 17px;
`;

export const RenderItemStyled = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RenderItemImageStyled = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

export const RenderItemNameStyled = styled.Text`
  margin-right: 15px;
`;

export const RenderEmptyDateStyled = styled.View`
  height: 15px;
  flex: 1;
  padding-top: 30px;
`;

export const Dotsiconstyled = styled(MaterialCommunityIcons)`
  margin-bottom: 5px;
`;

export const MaterialIconstyled = styled(MaterialIcons)`
  margin-bottom: 5px;
`;

export const Ioniconstyled = styled(Ionicons)`
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: auto;
  margin-left: auto;
  font-size: 50px;
`;
export const AntDesignstyled = styled(AntDesign)`
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: auto;
  margin-left: auto;
  font-size: 50px;
`;

export const EntypoIconStyled = styled(Entypo)`
  font-size: 30px;
  margin-left: 90%;
`;

export const TextStyled = styled.Text`
  margin-bottom: 5px;
`;

//Add && Edit Event Screens

export const AddEventWrapper = styled.View`
  margin-top: 50px;
  margin-right: 20px;
  margin-left: 20px;
`;

//Profile
export const ProfileWrapper = styled.View`
  margin-bottom: 20px;
`;

export const ProfileImage = styled.Image`
  width: 175px;
  height: 175px;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 100px;
`;

export const ProfileUsernameStyled = styled.Text`
  color: ${({ theme }) => theme.black};
  font-weight: bold;
  font-size: 30px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
`;

export const NumberOfFriendsStyled = styled.Text`
  color: ${({ theme }) => theme.blackish};
  font-weight: bold;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
`;

export const ProfileBio = styled.Text`
  color: ${({ theme }) => theme.blackish};
  font-weight: bold;
  font-size: 20px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
`;

//Buttons
export const EditProfileButtonStyled = styled(Icon)`
  color: ${({ theme }) => theme.Maincolor};
  margin-right: 500px;
  padding-left: 20px;
  /* margin-bottom: 10px; */
`;

export const SignOutButtonStyled = styled(Icon)`
  color: ${({ theme }) => theme.Maincolor};
  margin-right: 10px;
  padding-left: 20px;
  margin-bottom: 10px;
`;

//Signin && Signup Styling
export const AuthContainer2 = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  padding-right: 60px;
  padding-left: 60px;
`;

export const AuthTitle = styled.Text`
  color: ${(props) => props.theme.blackish};
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom-color: ${({ theme }) => theme.blackish};
`;

export const AuthTextInput2 = styled.TextInput`
  align-self: stretch;
  text-align: left;
  height: 40px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.blackish};
  border-bottom-color: ${({ theme }) => theme.blackish};
  border-bottom-width: 1px;
`;

export const AuthButton = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.Maincolor};
  margin-top: 30px;
`;

export const AuthButtonText = styled.Text`
  color: ${({ theme }) => theme.backgroundColor};
  font-weight: bold;
  font-size: 18px;
`;

export const AuthOther = styled.Text`
  color: ${({ theme }) => theme.blackish};
  margin-top: 15px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const SplashImageStyled = styled.Image`
  width: 200px;
  height: 200px;
  margin-top: 300px;
  margin-right: auto;
  margin-left: auto;
  /* border-radius: 100px; */
`;

export const SplashDescription = styled.Text`
  margin-top: 5px;
  color: ${({ theme }) => theme.blueish};
  font-size: 25px;
  font-style: italic;
  text-align: center;
  margin-right: 10px;
  margin-left: 10px;
`;
