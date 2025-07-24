document.addEventListener("DOMContentLoaded", function () {
  // Helper: Load page dynamically
  function loadPage(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        return response.text();
      })
      .then(html => {
        document.querySelector(".main-wrapper").innerHTML = html;
      })
      .catch(error => {
        console.error(error);
        document.querySelector(".main-wrapper").innerHTML = `<div class='p-4 text-danger'>⚠ ${error.message}</div>`;
      });
  }

  // Sidebar dropdown logic
  document.querySelectorAll('.sidebar .nav-link[data-menu]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const menu = this.getAttribute('data-menu');
      document.querySelectorAll('.sidebar .nav-link[data-menu]').forEach(l => {
        if (l !== this) {
          l.classList.remove('active');
          l.querySelector('.chevron').style.transform = 'rotate(0deg)';
          const submenu = document.querySelector(`.sidebar .submenu[data-submenu='${l.getAttribute('data-menu')}']`);
          if (submenu) submenu.style.display = 'none';
        }
      });
      const submenu = document.querySelector(`.sidebar .submenu[data-submenu='${menu}']`);
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        this.classList.remove('active');
        this.querySelector('.chevron').style.transform = 'rotate(0deg)';
      } else {
        submenu.style.display = 'block';
        this.classList.add('active');
        this.querySelector('.chevron').style.transform = 'rotate(180deg)';
      }
    });
  });

  // Responsive sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  hamburgerBtn?.addEventListener('click', function (e) {
    e.stopPropagation();
    sidebar.classList.toggle('hide');
  });

  document.addEventListener('click', function (event) {
    if (window.innerWidth <= 1024 && !sidebar.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      sidebar.classList.add('hide');
    }
  });

  function checkSidebar() {
    if (window.innerWidth <= 1024) {
      sidebar.classList.add('hide');
    } else {
      sidebar.classList.remove('hide');
    }
  }
  window.addEventListener('resize', checkSidebar);
  checkSidebar();

  // Theme toggle
  document.getElementById("themeToggle")?.addEventListener("click", function () {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");
    const darkMode = body.classList.toggle("dark-mode");
    themeIcon.classList.toggle("bi-sun", !darkMode);
    themeIcon.classList.toggle("bi-moon", darkMode);
    body.style.background = darkMode ? "#04213c" : "";
  });

  // Language selector
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      document.getElementById('langBtn').innerText = this.innerText;
    });
  });

  // Notification bell
  document.getElementById('notifyBtn')?.addEventListener('click', function () {
    alert('You have new notifications!');
  });

  // Profile dropdown
  const profileMenuBtn = document.getElementById('profileMenuBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  profileMenuBtn?.addEventListener('click', function (e) {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
  });
  document.addEventListener('click', function (event) {
    if (!profileMenuBtn?.contains(event.target)) {
      profileDropdown.classList.remove('show');
    }
  });

  document.getElementById('logout')?.addEventListener('click', function () {
    alert('Logging out...');
  });

  // Highlight active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.href === window.location.href);
  });

  // Driver form submission
  const driverForm = document.getElementById('driverForm');
  if (driverForm) {
    driverForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Driver added successfully!');
    });
  }
  // Dynamic navigation
  const navMap = {
    addFirstDriverBtn: 'Driver/Add-driver.html',
    tabAddDriver: 'Driver/Add-driver.html',
    pendingDriverLink: 'Driver/pending-driver.html',
    addDriverLink: 'Driver/Add-driver.html',
    driverListLink: 'Driver/driver-list.html',
    manageDriverDocLink: 'Driver/driver-document.html',
    rideHistoryLink: 'Ride Request/ride-history.html',
    activeRidesLink: 'Ride Request/active-rides.html',
    completedRidesLink: 'Ride Request/completed-rides.html',
    cancelledRidesLink: 'Ride Request/cancelled-rides.html',
    carDetailsListLink: 'Car Details/car-details.html',
    withdrawHistoryLink: 'Withdraw Request/withdraw-history.html',
    pendingWithdrawLink: 'Withdraw Request/pending-withdraw.html',
    approvedWithdrawLink: 'Withdraw Request/approved-withdraw.html',
    declineWithdrawLink: 'Withdraw Request/decline-withdraw.html',
    withdrawRequestLink: 'Withdraw Request/withdraw-request.html',
    driverEarningReportLink: 'Report/driver-earning.html',
    driverDocumentsReportLink: 'Report/documents.html',
    liveLocationLink: 'Driver Location/live-location.html',
    locationHistoryLink: 'Driver Location/location-history.html',
    ticketLink: 'Settings/ticket.html',
    bankingDetailsLink: 'Settings/banking-details.html',
    vatTaxDetailsLink: 'Settings/tax-details.html',
    contactUsLink: 'Settings/contact.html',
    myProfile: 'Header/my-profile.html'
  };

  for (const [id, url] of Object.entries(navMap)) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => loadPage(url));
    }
  }

  // Add Document logic 
  document.getElementById('driverDocumentsReportLink')?.addEventListener('click', function () {
    loadPage('Report/documents.html');
    setTimeout(() => {
      const addDocBtn = document.getElementById('addDocumentBtn');
      if (addDocBtn) {
        addDocBtn.addEventListener('click', function () {
          loadPage('Report/add-document.html');
        });
      }
    }, 500);
  });

  //  Add Ticket logic
  document.getElementById('ticketLink')?.addEventListener('click', function () {
    loadPage('Settings/ticket.html');
    setTimeout(() => {
      const addTicketBtn = document.getElementById('addTicketButton'); // <== fixed this line
      if (addTicketBtn) {
        addTicketBtn.addEventListener('click', function () {
          loadPage('Settings/add-ticket.html');
        });
      }
    }, 500);
  });

  // Ticket Form Logic 
  const fileInput = document.getElementById('attachment');
  const fileList = document.getElementById('fileList');
  let selectedFiles = [];

  if (fileInput && fileList) {
    fileInput.addEventListener('change', function (e) {
      const newFiles = Array.from(e.target.files);
      selectedFiles = [...selectedFiles, ...newFiles];
      displayFiles();
    });

    function displayFiles() {
      fileList.innerHTML = '';
      selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
          <span>📄 ${file.name} (${formatFileSize(file.size)})</span>
          <span class="remove-file" style="cursor:pointer; color:red;" onclick="removeFile(${index})">×</span>
        `;
        fileList.appendChild(fileItem);
      });
    }

    window.removeFile = function (index) {
      selectedFiles.splice(index, 1);
      displayFiles();
    };

    function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    document.getElementById('ticketForm')?.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      selectedFiles.forEach(file => {
        formData.append('attachments[]', file);
      });
      alert('Ticket submitted successfully! You will receive a confirmation email shortly.');
      this.reset();
      selectedFiles = [];
      displayFiles();
    });

    document.querySelector('.btn-cancel')?.addEventListener('click', function () {
      if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
        document.getElementById('ticketForm').reset();
        selectedFiles = [];
        displayFiles();
      }
    });
  }
});

 // Sample ticket data for demonstration
    let tickets = [];
    let ticketCounter = 1001;

    // View switching functions
    function showTicketList() {
      document.getElementById('ticketListView').style.display = 'block';
      document.getElementById('raiseTicketView').style.display = 'none';
    }

    function showRaiseTicket() {
      document.getElementById('ticketListView').style.display = 'none';
      document.getElementById('raiseTicketView').style.display = 'block';
    }

    // Form validation and submission
    document.getElementById('ticketForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        ticketNumber: `TKT-${ticketCounter++}`,
        driverName: document.getElementById('driverName').value,
        contactNumber: document.getElementById('contactNumber').value,
        emailAddress: document.getElementById('emailAddress').value,
        issueCategory: document.getElementById('issueCategory').value,
        priorityLevel: document.getElementById('priorityLevel').value,
        location: document.getElementById('location').value,
        issueSubject: document.getElementById('issueSubject').value,
        issueDescription: document.getElementById('issueDescription').value,
        ticketDate: new Date().toLocaleDateString(),
        lastUpdate: new Date().toLocaleDateString(),
        closeDate: '-',
        resolutionGiven: 'Pending',
        status: 'Open'
      };

      // Basic validation
      if (formData.issueDescription.length < 20) {
        alert('Issue description must be at least 20 characters long.');
        return;
      }

      // Add ticket to array
      tickets.push(formData);
      
      // Update table
      updateTicketTable();
      
      // Reset form
      document.getElementById('ticketForm').reset();
      
      // Show success message
      alert('Ticket submitted successfully! Ticket Number: ' + formData.ticketNumber);
      
      // Switch back to list view
      showTicketList();
    });

    // Save as draft functionality
    document.getElementById('saveDraft').addEventListener('click', function() {
      // In a real application, you would save the form data
      alert('Ticket saved as draft!');
    });

    // Update ticket table
    function updateTicketTable() {
      const tbody = document.getElementById('ticketTableBody');
      
      if (tickets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-muted">No tickets found.</td></tr>';
        return;
      }

      tbody.innerHTML = tickets.map(ticket => `
        <tr>
          <td><span class="badge bg-primary">${ticket.ticketNumber}</span></td>
          <td>${ticket.driverName}</td>
          <td class="text-start" style="max-width: 200px;">
            <div class="fw-semibold">${ticket.issueSubject}</div>
            <small class="text-muted">${ticket.issueCategory}</small>
          </td>
          <td>${ticket.ticketDate}</td>
          <td>${ticket.lastUpdate}</td>
          <td>${ticket.closeDate}</td>
          <td>${ticket.resolutionGiven}</td>
          <td>
            <span class="badge ${ticket.status === 'Open' ? 'bg-success' : 'bg-secondary'}">
              ${ticket.status}
            </span>
          </td>
        </tr>
      `).join('');
    }

    // File upload validation
    document.getElementById('attachment').addEventListener('change', function() {
      const files = this.files;
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      for (let file of files) {
        if (file.size > maxSize) {
          alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
          this.value = '';
          return;
        }
      }
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      showTicketList();
    });

// Add document script
// File upload handling
        document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', function() {
                const fileUpload = this.closest('.file-upload');
                const fileInfo = document.getElementById(this.id + '-info');
                const label = fileUpload.querySelector('.file-upload-label span');
                
                if (this.files.length > 0) {
                    fileUpload.classList.add('has-file');
                    
                    if (this.multiple) {
                        label.textContent = `${this.files.length} file(s) selected`;
                        let fileList = Array.from(this.files).map(file => file.name).join(', ');
                        fileInfo.innerHTML = `<i class="fas fa-check-circle"></i> Files: ${fileList}`;
                    } else {
                        label.textContent = this.files[0].name;
                        fileInfo.innerHTML = `<i class="fas fa-check-circle"></i> File: ${this.files[0].name} (${(this.files[0].size / 1024).toFixed(1)} KB)`;
                    }
                    
                    fileInfo.classList.add('show');
                } else {
                    fileUpload.classList.remove('has-file');
                    label.textContent = label.textContent.includes('Other') ? 'Choose Other Documents' : 
                                      label.textContent.includes('Transport') ? 'Choose Transport License' :
                                      label.textContent.includes('Driving') ? 'Choose Driving License' :
                                      label.textContent.includes('Front') ? 'Choose ID Front' :
                                      label.textContent.includes('Back') ? 'Choose ID Back' :
                                      label.textContent.includes('VAT') ? 'Choose VAT Certificate' :
                                      label.textContent.includes('Registration') ? 'Choose Registration Certificate' :
                                      label.textContent.includes('Employee') ? 'Choose Employee History' : 'Choose File';
                    fileInfo.classList.remove('show');
                }
            });
        });

        // Form validation and submission
        document.getElementById('driverFleetForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                
                // Scroll to first invalid field
                const firstInvalid = this.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
                return;
            }

            // Show progress bar
            const progressBar = document.querySelector('.progress-bar');
            const progressBarInner = document.querySelector('.progress-bar .progress-bar');
            progressBar.style.display = 'block';
            
            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                progressBarInner.style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        alert('✅ Application submitted successfully! You will receive a confirmation email shortly.');
                        progressBar.style.display = 'none';
                        progressBarInner.style.width = '0%';
                    }, 500);
                }
            }, 200);
        });

        // Reset form
        document.querySelector('.btn-reset').addEventListener('click', function() {
            document.getElementById('driverFleetForm').classList.remove('was-validated');
            document.querySelectorAll('.file-upload').forEach(upload => {
                upload.classList.remove('has-file');
            });
            document.querySelectorAll('.file-info').forEach(info => {
                info.classList.remove('show');
            });
            
            // Reset file upload labels
            document.querySelectorAll('.file-upload-label span').forEach(span => {
                const text = span.textContent;
                if (text.includes('selected') || !text.includes('Choose')) {
                    const input = span.closest('.file-upload').querySelector('input');
                    const originalText = input.id.includes('transport') ? 'Choose Transport License' :
                                       input.id.includes('driving') ? 'Choose Driving License' :
                                       input.id.includes('idFront') ? 'Choose ID Front' :
                                       input.id.includes('idBack') ? 'Choose ID Back' :
                                       input.id.includes('vat') ? 'Choose VAT Certificate' :
                                       input.id.includes('company') ? 'Choose Registration Certificate' :
                                       input.id.includes('employee') ? 'Choose Employee History' :
                                       input.id.includes('other') ? 'Choose Other Documents' : 'Choose File';
                    span.textContent = originalText;
                }
            });
        });

        // Add smooth scrolling for form sections
        document.querySelectorAll('.form-control, .file-upload-label').forEach(element => {
            element.addEventListener('focus', function() {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
     
