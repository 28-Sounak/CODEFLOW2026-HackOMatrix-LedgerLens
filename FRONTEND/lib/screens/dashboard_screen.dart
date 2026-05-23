import 'package:flutter/material.dart';
import 'upload_screen.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color(0xFFF5F7FB),
      body: SafeArea(
        child: UploadScreen(),
      ),
    );
  }
}