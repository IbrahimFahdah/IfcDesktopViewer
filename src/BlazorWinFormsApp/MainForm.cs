using System;
using System.Windows.Forms;
using Microsoft.AspNetCore.Components.WebView.WindowsForms;
using Microsoft.Extensions.DependencyInjection;
using WebviewAppShared;


namespace IFCjsWinFormsApp
{
    public partial class MainForm : Form
    {
        private ServiceCollection _serviceCollection;
        private ShareState shareState = new ShareState();
        public MainForm()
        {
            _serviceCollection = new ServiceCollection();
            _serviceCollection.AddSingleton<ShareState>(shareState);
            _serviceCollection.AddWindowsFormsBlazorWebView();


            InitializeComponent();

            blazorWebView1.HostPage = @"wwwroot\index.html";
            blazorWebView1.Services = _serviceCollection.BuildServiceProvider();
            blazorWebView1.RootComponents.Add<App>("#app");
        }

        private void LoadModelToolStripMenuItem_Click(object sender, EventArgs e)
        {
            shareState.ShowFileDialog();
        }
    }
}
