import {web} from "./application/web";
import {logger} from "./application/logging";
import './cron-jobs';

web.listen(3000, ()=> {
    logger.info("Server travel started on port 3000.");
})