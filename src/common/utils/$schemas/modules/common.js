import { schema } from 'normalizr';



const customBlock = new schema.Entity('customBlock');
const systemBlock = new schema.Entity('systemBlock');



export default {
    customBlock,
    systemBlock
};
