import 'dart:typed_data';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../widgets/pie_chart.dart';
import '../widgets/summary_card.dart';

class UploadScreen extends StatefulWidget {
  const UploadScreen({super.key});

  @override
  State<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends State<UploadScreen> {
  bool loading = false;

  Map<String, dynamic>? analysis;

  Future<void> pickFile() async {
    FilePickerResult? res = await FilePicker.platform.pickFiles();

    if (res != null) {
      Uint8List fileBytes = res.files.first.bytes!;
      String fileName = res.files.first.name;

      setState(() => loading = true);

      var response = await ApiService.uploadFile(fileBytes, fileName);

      setState(() {
        analysis = response["analysis"];
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Finsight AI Dashboard",
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),

          ElevatedButton.icon(
            onPressed: pickFile,
            icon: const Icon(Icons.upload_file),
            label: const Text("Upload PDF"),
          ),

          const SizedBox(height: 20),

          if (loading) const LinearProgressIndicator(),

          const SizedBox(height: 20),

          if (analysis != null) ...[
            Row(
              children: [
                SummaryCard(
                  title: "Income",
                  value: analysis!["total_income"].toString(),
                  color: Colors.green,
                ),
                const SizedBox(width: 10),
                SummaryCard(
                  title: "Expense",
                  value: analysis!["total_expense"].toString(),
                  color: Colors.red,
                ),
                const SizedBox(width: 10),
                SummaryCard(
                  title: "Net",
                  value: analysis!["net"].toString(),
                  color: Colors.blue,
                ),
              ],
            ),

            const SizedBox(height: 30),

            Expanded(
              child: Center(
                child: PieChartWidget(
                  income: analysis!["total_income"].toDouble(),
                  expense: analysis!["total_expense"].toDouble(),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}