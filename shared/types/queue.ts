import type { UltrastarTrackType } from '#shared/types/ultrastar_track';

export class QueueType {
  SongDto!: UltrastarTrackType;
  SingScenePlayerDataDto!: {
    PlayerProfileNames: string[];
    PlayerProfileToMicProfileMap: {
      [player: string]: {
        Name: string;
        ChannelIndex: number;
        Color: string;
        Amplification: number;
        NoiseSuppression: number;
        IsEnabled: boolean;
        DelayInMillis: number;
        SampleRate: number;
        ConnectedClientId: any;
      };
    };
    PlayerProfileToVoiceIdMap: {
      [player: string]: string;
    };
  };
  GameRoundSettingsDto!: {
    ModifierDtos: any[];
    AnyModifierActive: boolean;
  };
  IsMedleyWithPreviousEntry!: boolean;
}
