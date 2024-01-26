using System.ComponentModel;

namespace WebviewAppShared
{
    public class ShareState : INotifyPropertyChanged
    {
        public void ShowFileDialog()
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ShowFileDialog)));
        }

        public void ClearModels()
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ClearModels)));
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
