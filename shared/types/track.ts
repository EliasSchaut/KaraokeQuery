export class TrackType {
  id!: number;
  artist!: string;
  title!: string;
  year!: number;
  edition!: string | null;
  genre!: string;
  tags!: string;
  language!: string;
  golden_notes!: boolean;
  cover_url!: string;
  cover_meta!: string;
  audio_url!: string | null;
  video_url!: string | null;
  duet!: boolean;
}
