import 'package:flutter/material.dart';
import '../services/api_service.dart';

class InsightsScreen extends StatefulWidget {
  const InsightsScreen({super.key});

  @override
  State<InsightsScreen> createState() => _InsightsScreenState();
}

class _InsightsScreenState extends State<InsightsScreen> {
  Map<String, dynamic>? data;

  Future<void> load() async {
    var res = await ApiService.getInsights();
    setState(() => data = res);
  }

  @override
  void initState() {
    super.initState();
    load();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: data == null
          ? const CircularProgressIndicator()
          : Text(data.toString()),
    );
  }
}