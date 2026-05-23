import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import '../services/api_service.dart';

class UploadScreen extends StatefulWidget {
  const UploadScreen({super.key});

  @override
  State<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends State<UploadScreen> {
  String result = "";
  bool loading = false;

  Future<void> pickFile() async {
    FilePickerResult? res = await FilePicker.platform.pickFiles();

    if (res != null) {
      Uint8List fileBytes = res.files.first.bytes!;
      String fileName = res.files.first.name;

      setState(() => loading = true);

      var response = await ApiService.uploadFile(fileBytes, fileName);

      setState(() {
        result = response.toString();
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
            onPressed: pickFile,
            child: const Text("Upload PDF"),
          ),
          const SizedBox(height: 20),
          if (loading) const CircularProgressIndicator(),
          const SizedBox(height: 20),
          Text(result),
        ],
      ),
    );
  }
}