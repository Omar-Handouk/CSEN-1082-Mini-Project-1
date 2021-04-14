import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import scratch.Sprite;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        JSONHandler json = new JSONHandler("/home/omar-handouk/test.json", false);

        JSONArray targets = (JSONArray) json.getObj().get("targets");
        JSONObject sprite = (JSONObject) targets.get(1);

        Sprite testSprite = new Sprite(sprite);



        testSprite.parseBlocks();
    }
}
