import Particles from "react-tsparticles";
import particlesconfig from "./config/particles-config";


const ParticlesBg = () => {
  // Your component logic goes here
  const options = {
    preset: "firefly",
  };
  return (
    <Particles options={options}>

    </Particles>
  );
};

export default ParticlesBg;
