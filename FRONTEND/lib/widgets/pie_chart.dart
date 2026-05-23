import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class PieChartWidget extends StatelessWidget {
  final double income;
  final double expense;

  const PieChartWidget({
    super.key,
    required this.income,
    required this.expense,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 300,
      child: PieChart(
        PieChartData(
          sections: [
            PieChartSectionData(
              value: income,
              title: "Income",
              color: Colors.green,
              radius: 80,
              titleStyle: const TextStyle(color: Colors.white),
            ),
            PieChartSectionData(
              value: expense,
              title: "Expense",
              color: Colors.red,
              radius: 80,
              titleStyle: const TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}