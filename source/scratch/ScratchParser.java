package scratch;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import scratch.blocks.Block;
import scratch.blocks.MoveBlock;

public class ScratchParser {
    public static Block getBlock(JSONObject obj) {
        Block block = null;

        switch (obj.get("opcode").toString()) {
            case "event_whenflagclicked":
                break;
            case "motion_movesteps":
                block = getMoveBlock(obj);
                break;
        }

        return block;
    }

    public static MoveBlock getMoveBlock(JSONObject obj) {
        JSONObject inputs = (JSONObject) obj.get("inputs");
        JSONArray stepsKey = (JSONArray) inputs.get("STEPS");
        JSONArray stepArr = (JSONArray) stepsKey.get(1);
        int steps = Integer.parseInt(stepArr.get(1).toString());

        return new MoveBlock(obj.get("opcode").toString(), obj.get("next").toString(), obj.get("parent").toString(),
                (JSONObject) obj.get("inputs"), Boolean.parseBoolean(obj.get("shadow").toString()), steps);
    }
}
