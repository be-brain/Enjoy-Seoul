import React from "react";
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../../util";
import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getEventList } from "../../api";
import Detail from "../../pages/Detail";

export default function Slide({ realtime }) {
  const { navigate } = useNavigation();

  const { data: getEventListData, isLoading: isLoadingEV } = useQuery(
    "getEventList",
    getEventList
  );

  return (
    <SwiperChildView>
      <BackgroundImg
        style={StyleSheet.absoluteFill}
        // style={{ position: "absolute", top: 0, left: 0 }}
        source={{
          uri: realtime.MAIN_IMG,
        }}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["transparent", "black"]}
      />
      <Row
        onPress={() =>
          navigate("Stacks", {
            screen: "Detail",
            params: {
              // itemId: imgId(item.MAIN_IMG),
              main_img: realtime.MAIN_IMG,
              codename: realtime.CODENAME,
              title: realtime.TITLE,
              date: realtime.DATE,
              target: realtime.USE_TRGT,
              target_fee: realtime.USE_FEE,
              place: realtime.PLACE,
              link: realtime.ORG_LINK,
              program: realtime.PROGRAM,
            },
          })
        }
      >
        <Poster
          source={{
            uri: realtime.MAIN_IMG,
          }}
        />
        <Column>
          <Title>{realtime.TITLE}</Title>
          <Rating>{realtime.DATE}</Rating>
          <Overview>
            {realtime.PROGRAM.slice(0, 80)}
            {realtime.PROGRAM.length > 80 && "..."}
          </Overview>
        </Column>
      </Row>
    </SwiperChildView>
  );
}
const SwiperChildView = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  height: ${SCREEN_HEIGHT / 3 + "px"};
  background-color: green;
`;

const BackgroundImg = styled.Image`
  height: 100%;
  width: 100%;
`;

const Row = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

const Column = styled.View`
  width: 65%;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

const Overview = styled.Text`
  font-size: 12px;
  color: white;
`;

const Rating = styled.Text`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
`;