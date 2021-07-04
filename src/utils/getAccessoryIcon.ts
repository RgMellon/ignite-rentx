import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import ForceSvg from "../assets/force.svg";
import GasolineSvg from "../assets/gasoline.svg";
import EnergySvg from "../assets/energy.svg";
import HybridSvg from "../assets/hybrid.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";
import { SvgProps } from "react-native-svg";

interface IconProps {
  [key: string]: React.FC<SvgProps>;
}

const icons: IconProps = {
  speed: SpeedSvg,
  acceleration: AccelerationSvg,
  turning_diameter: ForceSvg,
  gasoline_motor: GasolineSvg,
  exchange: ExchangeSvg,
  hybrid_motor: HybridSvg,
  electric_motor: EnergySvg,
  seats: PeopleSvg,
  car: CarSvg,
};

export function getAccessoryIcon(type = "car") {
  return icons[type!] ? icons[type!] : icons["car"];
}
