import Command from "../interfaces/Command";
import { creds } from "../config/creds";

class Feat extends Command { Process = () => this.Send(creds.description); }

export default Feat;