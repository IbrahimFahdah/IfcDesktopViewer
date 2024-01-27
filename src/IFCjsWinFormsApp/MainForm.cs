using System;
using System.Windows.Forms;
using Microsoft.AspNetCore.Components;
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
            blazorWebView1.StartPath = "/ifcjs";

            shareState.PropertyChanged += ShareState_PropertyChanged;
        }


        [Inject]
        protected NavigationManager NavigationManager { get; set; }

        private void LoadModelToolStripMenuItem_Click(object sender, EventArgs e)
        {
            shareState.ShowFileDialog();
        }

        private void unloadModelsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            shareState.ClearModels();
        }

        private void ShareState_PropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(ShareState.PropertyList))
            {
                lsProList.Items.Clear();

                foreach (var pair in shareState.PropertyList)
                {
                    ListViewItem item = new ListViewItem(pair.Key);
                    item.SubItems.Add(pair.Value.ToString());
                    lsProList.Items.Add(item);
                }
            }
        }
    }
}
