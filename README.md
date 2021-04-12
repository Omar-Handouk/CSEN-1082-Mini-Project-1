# Visual Programming, Spring term 2021
## Mini Project 1“Source-to-Source Transformation”

### Index
- [Preface](#preface)
- [Requirement](#requirements)
- [Blocks](#blocks)
- [Submission Guidelines](#submission-guidelines)
- [References](#references)
- [Literatur](#literatur)
___
### Preface

The aim of your first mini-project is to introduce you to the idea of source-to-source transformation.
In that context, an original program is transformed to a different but equivalent program. 
The two programs could be written in the same or different programming languages.

In the first 3-mini projects, you will be transforming a Scratch program to an object-oriented (Java) program.
In this mini project, the aim is to produce a textual representation of the visual program without interpreting or running it.
Scratch is an environment introduced to teach programming concepts. 
The platform is a visual environment through which kids could build interactive stories and games.
The motivation was the interest of children to join after-school computer centers (e.g. the Intel Computer Clubhouses).

You can download an offline version of Scratch. 
Scratch commands are automatically represented through JSON. 
Your task is to transform the JSON representation into a runnable Java file.

The Java program should be able to show the same output the user sees through scratch.
You thus have to:
- Parse the JSON file
- Transform it to an equivalent **Java** program
- Make sure the Java program has an equivalent UI interface
___
### Requirements
- OpenJDK/Oracle JDK 14+
- Prefered text editor
___
### Blocks
_The blocks that you should handle in your transformation are_
- Motion Blocks
  - Move
  - Turn
  - Go to _x, y_
  - Change _x, y_ by
  - Set _x, y_
- Looks Blocks
  - Say
  - Say for
  - Think
  - Think for
- Event Blocks
  - When green flag clicked
  - When _Key_ pressed
- Control Blocks
  - Forever
  - If Then
  - If Then Else
  - Wait
  - Wait Until
  - Repeat
  - Repeat Until
___
### Submission Guidelines
- You should upload
  - Source code
  - Read-Me
- Uploads are done via **Google Drive/ Dropbox**
- URL submission via **MET** Website
___
### References
- [Scratch](https://scratch.mit.edu/)
- [Scratch source code](https://github.com/LLK/scratch-blocks)
- [Scratch Wiki](https://en.scratch-wiki.info/wiki/Scratch_Wiki_Home)
- [Scratch file format](https://en.scratch-wiki.info/wiki/Scratch_File_Format)
- [Working with JSON in Java](https://www.tutorialspoint.com/json/json_java_example.htm)
- [JDK 16 Docs](https://docs.oracle.com/en/java/javase/16/)
- [Multi-threading in Java](https://www.geeksforgeeks.org/multithreading-in-java/)
- [Lifecycle and states of a thread in Java](https://www.geeksforgeeks.org/lifecycle-and-states-of-a-thread-in-java/)
- [Thread.sleep() in Java – Java Thread sleep](https://www.journaldev.com/1020/thread-sleep-java)
- [Javapoint Swing reference](https://www.javatpoint.com/java-swing)
- [NTU Swing GUI Programming](https://www3.ntu.edu.sg/home/ehchua/programming/java/j4a_gui.html)
- [ZetCode Swing tutorials](https://zetcode.com/javaswing/)
___
### Literatur
- John Maloney, Mitchel Resnick, Natalie Rusk, Brian Silverman, and Evelyn Eastmond. The scratch programming language and environment.TOCE, 10(4):16:1–16:15, 2010
- Mitchel Resnick, Yasmin Kafai, John Maloney, Natalie Rusk, Leo Burd, and Brian Silverman.  A networked, media-rich programming environment to enhance technological fluency at after-school centers in economically-disadvantaged communities. Technical report, 2003
