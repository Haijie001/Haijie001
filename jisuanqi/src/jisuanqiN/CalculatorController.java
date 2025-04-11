package jisuanqiN;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CalculatorController {
    private CalculatorView view;
    private double num1 = 0, num2 = 0, result = 0;
    private char operator;

    public CalculatorController(CalculatorView view) {
        this.view = view;

        // Add listeners to view components
        view.addNumberButtonListener(new NumberButtonListener());
        view.addFunctionButtonListener(new FunctionButtonListener());
        view.addDecimalButtonListener(new DecimalButtonListener());
        view.addEqualsButtonListener(new EqualsButtonListener());
        view.addDeleteButtonListener(new DeleteButtonListener());
        view.addClearButtonListener(new ClearButtonListener());
    }

    // ActionListener for number buttons
    private class NumberButtonListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String buttonText = e.getActionCommand();
            view.setTextFieldText(view.getTextFieldText() + buttonText);
        }
    }

    // ActionListener for function buttons (+, -, *, /)
    private class FunctionButtonListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String buttonText = e.getActionCommand();
            num1 = Double.parseDouble(view.getTextFieldText());
            operator = buttonText.charAt(0);
            view.setTextFieldText("");
        }
    }

    // ActionListener for decimal button
    private class DecimalButtonListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            if (!view.getTextFieldText().contains(".")) {
                view.setTextFieldText(view.getTextFieldText() + ".");
            }
        }
    }

    // ActionListener for equals button
    private class EqualsButtonListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            num2 = Double.parseDouble(view.getTextFieldText());

            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 != 0)
                        result = num1 / num2;
                    else
                        view.setTextFieldText("Error");
                    break;
            }

            view.setTextFieldText(String.valueOf(result));
            num1 = result;
        }
    }

    // ActionListener for delete button
    private class DeleteButtonListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String currentText = view.getTextFieldText();
            if (currentText.length() > 0) {
                view.setTextFieldText(currentText.substring(0, currentText.length() - 1));
            }
        }
    }

    // ActionListener for clear button
    private class ClearButtonListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            view.setTextFieldText("");
            num1 = 0;
            num2 = 0;
            result = 0;
        }
    }

    public static void main(String[] args) {
        CalculatorView view = new CalculatorView();
        CalculatorController controller = new CalculatorController(view);
    }
}