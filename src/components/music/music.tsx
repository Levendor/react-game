import { Component } from 'react';

interface Props {
  musicSrc: string;
  volume: number;
}

interface State {
  volume: number;
}

export default class Music extends Component<Props, State> {
  music: HTMLAudioElement;
  ready: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      volume: this.props.volume,
    }
    const { musicSrc, volume } = this.props;
    this.music = new Audio(musicSrc);
    this.music.loop = true;
    this.music.volume = volume / 10;
    this.ready = false;
  }

  getDerivedStateFromProps = () => {
    this.setState({
      volume: this.props.volume,
    })
  }

  componentDidUpdate = () => {
    if (this.ready) {
      this.music.pause();
      this.music.volume = this.state.volume / 10;
      this.music.play();
    } else this.ready = true;
  }

  render() {
    return (
      <audio src={this.props.musicSrc}></audio>
    );
  }
}