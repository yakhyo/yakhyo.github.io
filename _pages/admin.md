---
layout: page
title: Admin Dashboard
permalink: /admin/
sitemap: false
---

<style>
  .admin-container {
    max-width: 800px;
    margin: 2rem auto;
  }
  .stat-card {
    background: #f9f9f9;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .stat-card h3 {
    margin-top: 0;
    color: #111;
    font-size: 1.2rem;
  }
  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e90ff;
    margin: 1rem 0;
  }
  .stat-label {
    color: #666;
    font-size: 0.9rem;
  }
  .loading {
    color: #999;
    font-style: italic;
  }
</style>

<div class="admin-container">
  <h1>📊 Admin Dashboard</h1>
  <p style="color: #666;">Private analytics and statistics</p>

  <div class="stat-card">
    <h3>📥 Resume Downloads</h3>
    <div class="stat-value" id="download-count">
      <span class="loading">Loading...</span>
    </div>
    <div class="stat-label">Total PDF downloads tracked</div>
  </div>

  <div class="stat-card">
    <h3>📋 Resume Page Views</h3>
    <div class="stat-value" id="resume-views">
      <span class="loading">Loading...</span>
    </div>
    <div class="stat-label">Total resume page views</div>
  </div>

  <div class="stat-card">
    <h3>📈 Google Analytics</h3>
    <p>For detailed analytics, visit your <a href="https://analytics.google.com/analytics/web/#/p{{ site.google_analytics }}" target="_blank" rel="noopener noreferrer">Google Analytics Dashboard</a></p>
  </div>
</div>

<script>
  // Fetch download count from CountAPI
  fetch('https://api.countapi.xyz/get/yakhyo.github.io/resume-downloads')
    .then(res => res.json())
    .then(data => {
      document.getElementById('download-count').textContent = data.value || 0;
    })
    .catch(err => {
      document.getElementById('download-count').textContent = 'Error loading';
    });

  // Fetch resume page view count
  fetch('https://api.countapi.xyz/get/yakhyo.github.io/resume-views')
    .then(res => res.json())
    .then(data => {
      document.getElementById('resume-views').textContent = data.value || 0;
    })
    .catch(err => {
      document.getElementById('resume-views').textContent = 'Error loading';
    });
</script>
