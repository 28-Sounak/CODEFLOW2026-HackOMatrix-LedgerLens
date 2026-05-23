import 'dart:convert';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import '../utils/constants.dart';

class ApiService {
  static Future<Map<String, dynamic>> uploadFile(Uint8List fileBytes, String fileName) async {
    var uri = Uri.parse("${ApiConstants.baseUrl}/upload/");

    var request = http.MultipartRequest("POST", uri);

    request.files.add(
      http.MultipartFile.fromBytes(
        "file",
        fileBytes,
        filename: fileName,
      ),
    );

    var response = await request.send();
    var responseData = await response.stream.bytesToString();

    return jsonDecode(responseData);
  }

  static Future<Map<String, dynamic>> getInsights() async {
    var res = await http.get(Uri.parse("${ApiConstants.baseUrl}/insights/"));
    return jsonDecode(res.body);
  }
}