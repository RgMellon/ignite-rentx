import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";

import * as S from "./styles";

type ImageSliderProps = {
  imagesUrl: string[];
};

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;

    setImageIndex(index);
  });

  return (
    <S.Container>
      <S.ImageIndexes>
        {imagesUrl.map((_, index) => {
          return <Bullet key={index} active={index === imageIndex} />;
        })}
      </S.ImageIndexes>

      <FlatList
        horizontal
        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage source={{ uri: item }} resizeMode="contain" />
          </S.CarImageWrapper>
        )}
      />
    </S.Container>
  );
}
