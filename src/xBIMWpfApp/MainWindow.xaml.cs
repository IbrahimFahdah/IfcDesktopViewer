using System.IO;
using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using WebviewAppShared;
using Xbim.Ifc;
using Xbim.ModelGeometry.Scene;


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

        private void UnLoadModels_Click(object sender, RoutedEventArgs e)
        {
            shareState.ClearModels();
        }

        private void GenerateWexBIM_Click(object sender, RoutedEventArgs e)
        {
            var dialog = new Microsoft.Win32.OpenFileDialog();
            dialog.DefaultExt = ".ifc";
            dialog.Filter = "IFC files (.ifc)|*.ifc";
            var result = dialog.ShowDialog();
            if (result == true)
            {
                string filename = dialog.FileName;

                var title = this.Title;

                this.Title = $"{this.Title} Please wait...";
                using (var model = IfcStore.Open(filename))
                {
                    var context = new Xbim3DModelContext(model);
                    context.CreateContext(adjustWcs: true);

                    var wexBimFilename = Path.ChangeExtension(filename, "wexBIM");
                    using (var wexBiMfile = File.Create(wexBimFilename))
                    {
                        using (var wexBimBinaryWriter = new BinaryWriter(wexBiMfile))
                        {
                            model.SaveAsWexBim(wexBimBinaryWriter);
                            wexBimBinaryWriter.Close();
                        }
                        wexBiMfile.Close();
                        this.Title = title;
                        MessageBox.Show($"{wexBimFilename} has been generated successfully.", "wexBim generation", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                }

            }
        }
    }

    public partial class Main { }
}
