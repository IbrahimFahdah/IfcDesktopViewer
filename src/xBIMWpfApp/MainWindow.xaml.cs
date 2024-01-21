using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using WebviewAppShared;

namespace xBIMWpfApp
{
    public partial class MainWindow : Window
    {
        private ShareState shareState = new ShareState();
        public MainWindow()
        {
            InitializeComponent();

            var serviceCollection = new ServiceCollection();
            serviceCollection.AddSingleton<ShareState>(shareState);
            serviceCollection.AddWpfBlazorWebView();
            Resources.Add("services", serviceCollection.BuildServiceProvider());
        }

        private void OpenModel_Click(object sender, RoutedEventArgs e)
        {
            shareState.ShowFileDialog();
        }
    }
    public partial class Main { }
}
