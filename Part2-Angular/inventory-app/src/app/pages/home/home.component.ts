/**
 * Author: Wenbo He
 * Student ID: 24832151
 * Assessment: PROG2005 Assessment 2 (A2) - Part 2*/
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. 导入 RouterLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // 2. 将其添加到 imports 数组中
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }