import { Center, Image } from '@chakra-ui/react';
import { MediaTypeEnum } from '@prisma/client';
import { ReactNode } from 'react';

interface Props {
  url: string;
  type: MediaTypeEnum;
}

export default function QuestionMedia({ url, type }: Props) {
  let mediaElement: ReactNode;

  switch (type) {
    case MediaTypeEnum.IMAGE:
      mediaElement = <Image src={url} alt="question image" />;
      break;
    case MediaTypeEnum.VIDEO:
      mediaElement = (
        <video controls autoPlay muted>
          <source src={url} />
          Your browser does not support HTML video.
        </video>
      );
      break;
    case MediaTypeEnum.AUDIO:
      mediaElement = (
        <audio controls>
          <source src={url} />
          Your browser does not support HTML audio.
        </audio>
      );
      break;
  }

  return <Center maxH={400}>{mediaElement}</Center>;
}
