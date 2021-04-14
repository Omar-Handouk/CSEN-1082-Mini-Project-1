package scratch.blocks;

import java.awt.geom.Point2D;

public class MoveBlock extends Block {

    private int steps = 0;

    public MoveBlock(String opcode, String next, String parent, Object inputs, boolean isShadow) {
        super(opcode, next, parent, inputs, isShadow);
    }

    public MoveBlock(String opcode, String next, String parent, Object inputs, boolean isShadow, int steps) {
        super(opcode, next, parent, inputs, isShadow);
        this.steps = steps;
    }

    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }

    public Point2D move(int x, int y, int direction) {
        direction = 90 - direction;
        return new Point2D.Double(x + steps * Math.cos(direction), y + steps * Math.sin(direction));
    }

    @Override
    public String toString() {
        return "MoveBlock{" +
                super.toString() +
                ", steps=" + steps +
                '}';
    }
}
