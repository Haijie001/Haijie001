package jisuanqiN;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class CalculatorView extends JFrame {
    private JTextField textField;
    private JButton[] numberButtons;
    private JButton[] functionButtons;
    private JPanel panel;

    public CalculatorView() {
        setTitle("这是一个潦草的计算器！！！╮（￣▽￣）╭");
        setSize(400, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);
        getContentPane().setBackground(new Color(237, 240, 241)); // Light gray background

        panel = new JPanel();
        panel.setLayout(new GridLayout(5, 4, 10, 10));
        panel.setBackground(new Color(189, 195, 199)); // Light blue background for panel

        textField = new JTextField();
        textField.setFont(new Font("Arial", Font.BOLD, 30));
        textField.setHorizontalAlignment(JTextField.RIGHT);
        textField.setEditable(false);
        textField.setBackground(new Color(255, 255, 255)); // White background
        textField.setBorder(BorderFactory.createLineBorder(new Color(52, 152, 219), 3)); // Border color
        textField.setColumns(50); // 设置文本框的列数，这里设为 20
        
        numberButtons = new JButton[10];
        for (int i = 0; i < 10; i++) {
            numberButtons[i] = new JButton(String.valueOf(i));
            numberButtons[i].setFont(new Font("Arial", Font.BOLD, 24));
            numberButtons[i].setForeground(new Color(52, 73, 94)); // Dark blue text color
            numberButtons[i].setBackground(new Color(236, 240, 241)); // Light gray button background
        }

        functionButtons = new JButton[4];
        functionButtons[0] = new JButton("+");
        functionButtons[1] = new JButton("-");
        functionButtons[2] = new JButton("*");
        functionButtons[3] = new JButton("/");

        for (int i = 0; i < 4; i++) {
            functionButtons[i].setFont(new Font("Arial", Font.BOLD, 24));
            functionButtons[i].setForeground(new Color(52, 73, 94)); // Dark blue text color
            functionButtons[i].setBackground(new Color(52, 152, 219)); // Blue button background
        }

        JButton decButton = new JButton(".");
        JButton equButton = new JButton("=");
        JButton delButton = new JButton("Del");
        JButton clrButton = new JButton("Clr");

        decButton.setFont(new Font("Arial", Font.BOLD, 24));
        decButton.setForeground(new Color(52, 73, 94)); // Dark blue text color
        decButton.setBackground(new Color(236, 240, 241)); // Light gray button background

        equButton.setFont(new Font("Arial", Font.BOLD, 24));
        equButton.setForeground(new Color(52, 73, 94)); // Dark blue text color
        equButton.setBackground(new Color(52, 152, 219)); // Blue button background

        delButton.setFont(new Font("Arial", Font.BOLD, 24));
        delButton.setForeground(new Color(52, 73, 94)); // Dark blue text color
        delButton.setBackground(new Color(231, 76, 60)); // Red button background

        clrButton.setFont(new Font("Arial", Font.BOLD, 24));
        clrButton.setForeground(new Color(52, 73, 94)); // Dark blue text color
        clrButton.setBackground(new Color(231, 76, 60)); // Red button background

        // Add components to panel
        panel.add(textField);

        for (int i = 7; i <= 9; i++) {
            panel.add(numberButtons[i]);
        }
        panel.add(functionButtons[3]);

        for (int i = 4; i <= 6; i++) {
            panel.add(numberButtons[i]);
        }
        panel.add(functionButtons[2]);

        for (int i = 1; i <= 3; i++) {
            panel.add(numberButtons[i]);
        }
        panel.add(functionButtons[1]);

        panel.add(decButton);
        panel.add(numberButtons[0]);
        panel.add(equButton);
        panel.add(functionButtons[0]);

        panel.add(delButton);
        panel.add(clrButton);

        add(panel);
        setVisible(true);
    }

    public void addNumberButtonListener(ActionListener listener) {
        for (JButton button : numberButtons) {
            button.addActionListener(listener);
        }
    }

    public void addFunctionButtonListener(ActionListener listener) {
        for (JButton button : functionButtons) {
            button.addActionListener(listener);
        }
    }

    public void addDecimalButtonListener(ActionListener listener) {
        Component comp = panel.getComponent(14);
        if (comp instanceof AbstractButton) {
            AbstractButton button = (AbstractButton) comp;
            button.addActionListener(listener);
        } else {
            // Handle if the component is not an AbstractButton (e.g., throw an exception or log an error)
            System.err.println("Component at index 14 is not an AbstractButton");
        }
    }

    public void addEqualsButtonListener(ActionListener listener) {
        Component comp = panel.getComponent(15);
        if (comp instanceof AbstractButton) {
            AbstractButton button = (AbstractButton) comp;
            button.addActionListener(listener);
        } else {
            // Handle if the component is not an AbstractButton (e.g., throw an exception or log an error)
            System.err.println("Component at index 15 is not an AbstractButton");
        }
    }

    public void addDeleteButtonListener(ActionListener listener) {
        Component comp = panel.getComponent(16);
        if (comp instanceof AbstractButton) {
            AbstractButton button = (AbstractButton) comp;
            button.addActionListener(listener);
        } else {
            // Handle if the component is not an AbstractButton (e.g., throw an exception or log an error)
            System.err.println("Component at index 16 is not an AbstractButton");
        }
    }

    public void addClearButtonListener(ActionListener listener) {
        Component comp = panel.getComponent(17);
        if (comp instanceof AbstractButton) {
            AbstractButton button = (AbstractButton) comp;
            button.addActionListener(listener);
        } else {
            // Handle if the component is not an AbstractButton (e.g., throw an exception or log an error)
            System.err.println("Component at index 17 is not an AbstractButton");
        }
    }
    public String getTextFieldText() {
        return textField.getText();
    }

    public void setTextFieldText(String text) {
        textField.setText(text);
    }

}
