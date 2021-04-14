import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Paths;

public class JSONHandler {

    private String jsonPath;
    private JSONObject obj;

    public JSONHandler(String jsonPath, boolean isNew) {
        this.jsonPath = jsonPath;

        if (isNew) {
            obj = new JSONObject();
        } else {
            try {
                obj = (JSONObject) this.readJSON();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public String getJsonPath() {
        return jsonPath;
    }

    public void setJsonPath(String jsonPath) {
        this.jsonPath = jsonPath;
    }

    public JSONObject getObj() {
        return obj;
    }

    public void setObj(JSONObject obj) {
        this.obj = obj;
    }

    public Object readJSON() throws Exception{
        FileReader reader = new FileReader(this.jsonPath);
        JSONParser parser = new JSONParser();

        return parser.parse(reader);
    }

    public void writeJSON(String filePath) throws Exception{
        Files.write(Paths.get(filePath), obj.toJSONString().getBytes());
    }
}
